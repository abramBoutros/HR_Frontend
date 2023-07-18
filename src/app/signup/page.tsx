"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/navbar";

const signup = async (
	name: string,
	email: string,
	password: string,
	role: string
) => {
	const res = await fetch("http://localhost:3210/auth/signup", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name,
			email,
			password,
			role,
		}),
	});

	return res.json();
};

export default function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const [errs, setErrs] = useState([]);

	const { push } = useRouter();

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault();

		const res = await signup(name, email, password, role);
		if (res.id) push("/signin");
		else {
			setErrs(res.message);
		}
	};

	return (
		<div>
			<Navbar />
			<form onSubmit={submit} className="container w-25">
				<h1 className="h3 mb-3 fw-normal">Sign up</h1>

				<input
					className="form-control my-3"
					placeholder="Name"
					required
					onChange={(e) => setName(e.target.value)}
				/>

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

				<p>
					Please select a role from the following: (ADMIN, HR, MARKETING, SALES,
					APP_SUPPORT, ENGINEER)
				</p>
				<input
					className="form-control my-3"
					placeholder="Role"
					required
					onChange={(e) => setRole(e.target.value)}
				/>

				<button className="w-100 btn btn-lg btn-primary my-5" type="submit">
					Submit
				</button>
				<h1 className="w-100 text-2xl font-bold text-red-600 my-5">
					{errs.map((e) => (
						<p key={e} className="my-3">
							{e}
						</p>
					))}
				</h1>
			</form>
		</div>
	);
}
