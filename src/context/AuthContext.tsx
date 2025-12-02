import { createSignal, createContext, useContext, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { RemoteRepository } from "../domain/repository/RemoteRepository";
import type { User } from "../domain/entity/User";

const repo = new RemoteRepository();

type AuthContextType = {
  user: () => User | null;
  token: () => string | null;
  isAuthenticated: () => boolean;
  register: (u: string, e: string, p: string, pc: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>();

export const AuthProvider = (props: any) => {
  const [user, setUser] = createSignal<User | null>(null);
  const [token, setToken] = createSignal<string | null>(localStorage.getItem("note_token"));

  const navigate = useNavigate();

  const loadUser = async () => {
    if (!token()) return;
    try {
      const u = await repo.getUser(token()!);
      setUser(u);
    } catch {
      setUser(null);
    }
  };

  onMount(loadUser);

  const register = async (username: string, email: string, password: string, passwordConfirm: string) => {
    await repo.register(username, email, password, passwordConfirm);
    // optional: auto-login here if you want
  };

  const login = async (email: string, password: string) => {
    const res = await repo.login(email, password);

    localStorage.setItem("note_token", res.token);
    setToken(res.token);

    await loadUser();
    navigate("/");
  };

  const logout = async () => {
    if (token()) {
      await repo.logout(token()!); // adds token to Redis blacklist
    }

    localStorage.removeItem("note_token");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: () => !!user(),
      register,
      login,
      logout
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
