"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/navbar";

const login = async (email: string, password: string) => {
	try {
		const response = await fetch("http://localhost:3210/auth/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
			credentials: "include",
			body: JSON.stringify({
				email,
				password,
			}),
		});

		const data = await response.json();
		if (data) {
			return data;
		} else {
			// Handle error
			console.log("Opsssiee XD");
		}
	} catch (error) {
		// Handle fetch error
		console.error("Error during login:", error);
		throw error;
	}
};

export default function Signin() {
	const { replace } = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault();
		const res = await login(email, password);

		if (res.statusCode === 400) return setMsg(res.message);

		replace("/dashboard");
	};

	return (
		<div>
			<Navbar />
			<form onSubmit={submit} className="container w-25">
				<h1 className="h3 mb-3 fw-normal">Sign in</h1>
				<input
					type="email"
					className="form-control my-3"
					placeholder="Email"
					required
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="password"
					className="form-control my-3"
					placeholder="Password"
					required
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className="w-100 btn btn-lg btn-primary my-3" type="submit">
					Submit
				</button>
				<h1 className="w-100 text-2xl font-bold text-red-600 m-4">{msg}</h1>
			</form>
		</div>
	);
}
