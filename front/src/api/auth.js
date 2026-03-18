// src/api/auth.js

const API_URL = "http://localhost:3000";

export async function signUp(data) {
  try {
    const res = await fetch(`${API_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data)
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('SignUp error:', error);
    throw error;
  }
}

export async function signIn(data) {
  try {
    const res = await fetch(`${API_URL}/auth/signIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data)
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('SignIn error:', error);
    throw error;
  }
}