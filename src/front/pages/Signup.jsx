import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

console.log("Renderizando Signup");

const Signup = () => {
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
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.msg || "Successfully registered user!!");
                setFormData({ email: "", password: "" });

                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                setError(data.error || "Error registering!!");
            }
        } catch (err) {
            console.error(err);
            setError("Server error!");
        }
    };

    return (
        <div style={signupStyles.container}>
            <form onSubmit={handleSubmit} style={signupStyles.form}>
                <h2 style={signupStyles.title}>Register</h2>

                <label style={signupStyles.label}>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={signupStyles.input}
                />

                <label style={signupStyles.label}>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={signupStyles.input}
                />

                <button type="submit" style={signupStyles.button}>Register</button>

                {message && <p style={{ ...signupStyles.message, color: "green" }}>{message}</p>}
                {error && <p style={{ ...signupStyles.message, color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

const signupStyles = {
    container: {
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
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
        fontSize: "24px",
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
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer"
    },
    message: {
        marginTop: "1rem",
        textAlign: "center"
    }
};

export default Signup;
