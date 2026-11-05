/// <reference types="vite/client" />
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult,
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
  Auth,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp,
  Firestore
} from 'firebase/firestore';
import { UserProfile } from '../types';

/**
 * Perfil limpo padrão para novos condutores ou estado deslogado
 */
export const INITIAL_USER_PROFILE: UserProfile = {
  name: '',
  email: '',
  isLoggedIn: false,
  streak: 0,
  cnhPoints: 0,
  maxCnhPoints: 20,
  xp: 0,
  completedLessons: [],
  simuladosHistory: [],
  soundEnabled: true,
  darkMode: true,
};

/**
 * Configuração do Firebase lida a partir das variáveis de ambiente Vite (prefixo VITE_)
 * As credenciais são carregadas do arquivo `.env` seguro.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
};

/**
 * Valida se as variáveis de ambiente necessárias foram configuradas no arquivo .env
 */
export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey.length > 10 &&
    !firebaseConfig.apiKey.includes('sua_api_key')
  );
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    try {
      db = initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager()
        })
      });
    } catch {
      db = getFirestore(app);
    }
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  } catch (err) {
    console.error('[Diriggo Firebase] Falha ao inicializar o Firebase:', err);
  }
} else {
  console.info(
    '[Diriggo Firebase] Modo de credenciais pendentes. Preencha o arquivo .env para ativar autenticação e persistência no Firebase.'
  );
}

/**
 * Tipo de persistência de sessão disponível no Firebase
 * - 'session': browserSessionPersistence -> a sessão é encerrada ao fechar a aba/janela ou fazer logout.
 * - 'local': browserLocalPersistence -> a sessão é mantida persistente mesmo após reabrir o navegador.
 * - 'memory': inMemoryPersistence -> a sessão reside exclusivamente na memória RAM da página ativa.
 */
export type SessionPersistenceType = 'session' | 'local' | 'memory';

/**
 * Configura o tipo de persistência de sessão do Firebase Auth
 */
export const setSessionPersistenceMode = async (mode: SessionPersistenceType): Promise<void> => {
  if (!auth) return;
  try {
    let persistence = browserLocalPersistence;
    if (mode === 'session') {
      persistence = browserSessionPersistence;
    } else if (mode === 'memory') {
      persistence = inMemoryPersistence;
    }
    await setPersistence(auth, persistence);
    console.info(`[Diriggo Firebase] Persistência de autenticação configurada para: ${mode}`);
  } catch (err) {
    console.warn('[Diriggo Firebase] Não foi possível definir persistência:', err);
  }
};

/**
 * Autentica o usuário exclusivamente com conta Google (Popup com fallback para Redirect).
 * @param sessionOnly Se verdadeiro, usa `browserSessionPersistence` (autenticação de sessão que expira ao fechar a janela).
 */
export const signInWithGoogle = async (sessionOnly: boolean = false): Promise<User | null> => {
  if (!isFirebaseConfigured() || !auth) {
    throw new Error('CONFIG_REQUIRED');
  }

  // 1. Aplica o modo de sessão desejado antes de abrir o popup
  try {
    const persistenceMode = sessionOnly ? browserSessionPersistence : browserLocalPersistence;
    await setPersistence(auth, persistenceMode);
  } catch (err) {
    console.warn('[Diriggo Firebase] Aviso ao configurar persistência de sessão:', err);
  }

  // 2. Cria provedor Google com prompt forçado 'select_account' para sempre solicitar confirmação
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ 
    prompt: 'select_account' 
  });

  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/popup-blocked') {
      await signInWithRedirect(auth, provider);
      return null;
    }
    throw error;
  }
};

/**
 * Verifica o resultado de login via redirect do Google (especialmente útil em navegadores móveis)
 */
export const checkRedirectResult = async (): Promise<User | null> => {
  if (!auth) return null;
  try {
    const result = await getRedirectResult(auth);
    return result?.user || null;
  } catch (err) {
    console.warn('[Diriggo Firebase] Erro ao verificar resultado de redirect:', err);
    return null;
  }
};

/**
 * Retorna o usuário autenticado atualmente no Firebase Auth (se houver)
 */
export const getCurrentAuthUser = (): User | null => {
  return auth?.currentUser || null;
};

/**
 * Realiza logout completo do usuário no Firebase Auth e limpa caches de sessão
 */
export const logoutFirebase = async (): Promise<void> => {
  if (auth) {
    await signOut(auth);
  }
  try {
    sessionStorage.clear();
    localStorage.removeItem('diriggo_user_profile_v4');
    localStorage.removeItem('diriggo_session_token');
  } catch {
    // ignore
  }
};

/**
 * Observa o estado de autenticação em tempo real
 */
export const subscribeToAuthChanges = (
  callback: (user: User | null) => void
): (() => void) => {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

/**
 * Salva ou atualiza os dados e progresso do usuário no Firestore (/users/{userId})
 * Sanitiza valores undefined para garantir que o Firestore nunca rejeite o payload.
 */
export const saveUserProgressToFirestore = async (profile: UserProfile): Promise<void> => {
  if (!db || !profile.uid) return;

  try {
    const userRef = doc(db, 'users', profile.uid);
    const dataToSave: Record<string, any> = {
      uid: profile.uid,
      name: profile.name || '',
      email: profile.email || '',
      photoURL: profile.photoURL || null,
      streak: profile.streak ?? 0,
      xp: profile.xp ?? 0,
      cnhPoints: profile.cnhPoints ?? 0,
      maxCnhPoints: profile.maxCnhPoints ?? 20,
      completedLessons: Array.isArray(profile.completedLessons) ? profile.completedLessons : [],
      simuladosHistory: (profile.simuladosHistory || []).map(s => ({
        id: s.id,
        topicTitle: s.topicTitle || 'Simulado Oficial DETRAN',
        date: s.date,
        score: s.score,
        total: s.total,
        passed: s.passed,
        timeSpentSeconds: s.timeSpentSeconds || 0,
        answers: s.answers || []
      })),
      darkMode: profile.darkMode !== false,
      soundEnabled: profile.soundEnabled !== false,
      updatedAt: serverTimestamp(),
    };

    await setDoc(userRef, dataToSave, { merge: true });
  } catch (err: any) {
    if (err?.message?.includes("Database '(default)' not found") || err?.code === 'not-found') {
      console.warn("[Diriggo Firebase] Banco de dados '(default)' ainda não criado no Firebase Console. O progresso foi salvo com segurança no localStorage.");
    } else {
      console.error('[Diriggo Firebase] Erro ao sincronizar progresso com o Firestore:', err);
    }
  }
};

/**
 * Busca o documento do usuário existente no Firestore
 */
export const fetchUserProgressFromFirestore = async (
  uid: string
): Promise<Partial<UserProfile> | null> => {
  if (!db) return null;

  try {
    const userRef = doc(db, 'users', uid);
    const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2500));
    const snapshot = await Promise.race([getDoc(userRef), timeoutPromise]);

    if (snapshot && snapshot.exists()) {
      return snapshot.data() as Partial<UserProfile>;
    }
    return null;
  } catch (err) {
    console.warn('[Diriggo Firebase] Erro ao carregar dados do usuário:', err);
    return null;
  }
};

/**
 * Carrega o progresso do usuário no Firestore ou inicializa um novo documento limpo
 * Garante isolamento estrito entre usuários e dados 100% zerados para novos cadastros.
 */
// Mapa para deduplicar chamadas concorrentes a syncOrInitUserProfile
const inFlightSyncMap = new Map<string, Promise<UserProfile>>();

export const syncOrInitUserProfile = async (user: User): Promise<UserProfile> => {
  if (inFlightSyncMap.has(user.uid)) {
    return inFlightSyncMap.get(user.uid)!;
  }

  const syncTask = (async (): Promise<UserProfile> => {
    if (!db) {
      return {
        ...INITIAL_USER_PROFILE,
        uid: user.uid,
        name: user.displayName || 'Novo Condutor',
        email: user.email || '',
        photoURL: user.photoURL || undefined,
        isLoggedIn: true,
      };
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      // Timeout seguro de 2.5s para evitar travamento de interface se o banco Cloud Firestore estiver inacessível ou não criado
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2500));
      const snapshot = await Promise.race([getDoc(userRef), timeoutPromise]);

      if (snapshot && snapshot.exists()) {
        const data = snapshot.data();
        return {
          uid: user.uid,
          name: user.displayName || data.name || 'Condutor Diriggo',
          email: user.email || data.email || '',
          photoURL: user.photoURL || data.photoURL || undefined,
          isLoggedIn: true,
          streak: typeof data.streak === 'number' ? data.streak : 0,
          cnhPoints: typeof data.cnhPoints === 'number' ? data.cnhPoints : 0,
          maxCnhPoints: typeof data.maxCnhPoints === 'number' ? data.maxCnhPoints : 20,
          xp: typeof data.xp === 'number' ? data.xp : 0,
          completedLessons: Array.isArray(data.completedLessons) ? data.completedLessons : [],
          simuladosHistory: Array.isArray(data.simuladosHistory) ? data.simuladosHistory : [],
          soundEnabled: data.soundEnabled !== false,
          darkMode: data.darkMode !== false,
        };
      }

      if (snapshot && !snapshot.exists()) {
        // Documento comprovadamente inexistente no Firestore (usuário novo): cria documento
        const newProfile: UserProfile = {
          ...INITIAL_USER_PROFILE,
          uid: user.uid,
          name: user.displayName || 'Novo Condutor',
          email: user.email || '',
          photoURL: user.photoURL || undefined,
          isLoggedIn: true,
        };

        // Gravação garantida no Firestore com { merge: true }
        setDoc(userRef, {
          uid: newProfile.uid,
          name: newProfile.name,
          email: newProfile.email,
          photoURL: newProfile.photoURL || null,
          streak: 0,
          xp: 0,
          cnhPoints: 0,
          maxCnhPoints: 20,
          completedLessons: [],
          simuladosHistory: [],
          soundEnabled: true,
          darkMode: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }, { merge: true }).catch(e => console.warn('[Diriggo Firebase] Erro ao gravar documento inicial:', e));

        return newProfile;
      }

      // Se snapshot for nulo (timeout ou falha de conectividade): recupera do cache local sem nunca sobrescrever com perfil zerado
      console.warn('[Diriggo Firebase] Firestore demorou para responder (banco pode não estar criado). Usando cache local seguro.');
      try {
        const cached = localStorage.getItem('diriggo_user_profile_v4');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.uid === user.uid) {
            return {
              ...INITIAL_USER_PROFILE,
              ...parsed,
              isLoggedIn: true,
            };
          }
        }
      } catch {
        // fallback
      }

      return {
        ...INITIAL_USER_PROFILE,
        uid: user.uid,
        name: user.displayName || 'Condutor Diriggo',
        email: user.email || '',
        photoURL: user.photoURL || undefined,
        isLoggedIn: true,
      };
    } catch (err) {
      console.warn('[Diriggo Firebase] Erro ao carregar dados do usuário no Firestore:', err);
      // Tenta recuperar do cache local do navegador para nunca perder progresso offline
      try {
        const cached = localStorage.getItem('diriggo_user_profile_v4');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.uid === user.uid) {
            return {
              ...INITIAL_USER_PROFILE,
              ...parsed,
              isLoggedIn: true,
            };
          }
        }
      } catch {
        // fallback
      }

      return {
        ...INITIAL_USER_PROFILE,
        uid: user.uid,
        name: user.displayName || 'Condutor Diriggo',
        email: user.email || '',
        photoURL: user.photoURL || undefined,
        isLoggedIn: true,
      };
    }
  })();

  inFlightSyncMap.set(user.uid, syncTask);
  try {
    return await syncTask;
  } finally {
    inFlightSyncMap.delete(user.uid);
  }
};
