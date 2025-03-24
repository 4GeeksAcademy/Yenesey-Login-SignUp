import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    setError("No autorizado");
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } catch (err) {
                console.error(err);
                setError("Profile don't found!");
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (error) {
        return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    }

    if (!user) {
        return <p style={{ textAlign: "center" }}>Loading user...</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Welcome, {user.email}</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Activo:</strong> {user.is_active ? "Sí" : "No"}</p>

            <button style={styles.logoutButton} onClick={handleLogout}>
                Log out!
            </button>
        </div>
    );
};

const styles = {
    container: {
        padding: "2rem",
        maxWidth: "500px",
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        marginTop: "2rem",
        textAlign: "center"
    },
    title: {
        marginBottom: "1.5rem",
        fontSize: "24px"
    },
    logoutButton: {
        marginTop: "2rem",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }
};

export default Private;
