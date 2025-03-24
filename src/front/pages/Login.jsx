import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

console.log("Renderizando Login");

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Login exitoso");
                localStorage.setItem("token", data.access_token);
                navigate("/private");
            } else {
                setError(data.error || "Error en el login");
            }
        } catch (err) {
            console.error(err);
            setError("Error en el servidor");
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Login</h2>

                <label style={styles.label}>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label style={styles.label}>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>Login</button>

                {message && <p style={{ ...styles.message, color: "green" }}>{message}</p>}
                {error && <p style={{ ...styles.message, color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
    },
    form: {
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
    },
    title: {
        marginBottom: "1.5rem",
        textAlign: "center",
        fontSize: "24px"
    },
    label: {
        marginBottom: "0.5rem",
        fontWeight: "bold"
    },
    input: {
        padding: "0.5rem",
        marginBottom: "1rem",
        borderRadius: "5px",
        border: "1px solid #ccc"
    },
    button: {
        padding: "0.75rem",
        borderRadius: "5px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        cursor: "pointer"
    },
    message: {
        marginTop: "1rem",
        textAlign: "center"
    }
};

export default Login;
