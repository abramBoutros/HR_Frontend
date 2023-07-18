"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Edit({ params }: any) {
	const [name, setName] = useState("");
	const [attendance, setAttendance] = useState("");
	const [role, setRole] = useState("");
	const [errs, setErrs] = useState([]);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const { push, refresh } = useRouter();

	useEffect(() => {
		(async () => {
			const res = await getUser(params.id);
			console.log(res);
			setName(res.name);
			setAttendance(res.attendance);
			setRole(res.role);

			if (!res.name) {
				push("/");
				return;
			}
			setIsSuccess(true);
		})();
	}, [params.id, push]);

	if (!isSuccess) {
		return <p>Loading...</p>;
	}

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault();

		const res = await update(params.id, name, attendance, role);
		if (res.name) {
			console.log(res);
			push("/dashboard");
		} else if (res.statusCode === 400) {
			setErrs(res.message);
		} else {
			push("/");
		}
	};

	return (
		<div className="container mt-5">
			<form onSubmit={submit} className="container w-25">
				<h1 className="h3 mb-3 fw-normal">
					Edit User with the id of: {params.id}
				</h1>

				<input
					className="form-control my-3"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<p>
					Please select a role from the following: (ADMIN, HR, MARKETING, SALES,
					APP_SUPPORT, ENGINEER)
				</p>
				<input
					className="form-control my-3"
					placeholder="Role"
					value={role}
					onChange={(e) => setRole(e.target.value)}
				/>

				<p>Please select a time following this format (HH:MM:SS)</p>
				<input
					className="form-control my-3"
					placeholder="Attendance"
					value={attendance}
					onChange={(e) => setAttendance(e.target.value)}
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

const update = async (
	id: number,
	name: string,
	attendance: string,
	role: string
) => {
	const res = await fetch("http://localhost:3210/auth/" + id, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		mode: "cors",
		credentials: "include",
		body: JSON.stringify({
			name,
			attendance,
			role,
		}),
	});

	return res.json();
};

const getUser = async (id: number) => {
	const res = await fetch("http://localhost:3210/auth/" + id, {
		method: "Get",
		headers: { "Content-Type": "application/json" },
		mode: "cors",
		credentials: "include",
	});

	return res.json();
};
