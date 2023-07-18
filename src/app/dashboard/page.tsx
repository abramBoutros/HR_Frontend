"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import UsersList from "../../components/users/userlist";

export default function DashboardPage() {
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [users, setUsers] = useState([]);
	const { push } = useRouter();

	useEffect(() => {
		(async () => {
			const { data, error } = await getUsers();
			const res = await data;

			setUsers(await res);

			if (error) {
				push("/");
				return;
			}
			setIsSuccess(true);
		})();
	}, [push]);

	if (!isSuccess) {
		return <p>Loading...</p>;
	}

	const handleDelete = async (id: number) => {
		const { data, error } = await deleteUser(id);
		const res = await data;

		if (error) {
			push("/");
			return;
		}

		if (res) {
			// Very declarative naming down here
			const data2 = await getUsers();

			if (data2.error) {
				push("/");
				return;
			}

			const newList = await data2.data;
			setUsers(await newList);

			alert(res.message);
		}
	};

	return (
		<main>
			<h1 className="w-100 text-6xl my-5 text-center ">
				{" "}
				Welcome to the Dashboard
			</h1>
			<UsersList users={users} handleDelete={handleDelete} />
		</main>
	);
}

async function getUsers(): Promise<any> {
	try {
		const data = await fetch("http://localhost:3210/auth", {
			method: "GET",
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return {
			data: await data.json(),
			error: null,
		};
	} catch (e) {
		const error = e as Error;
		return {
			data: null,
			error,
		};
	}
}

async function deleteUser(id: number): Promise<any> {
	try {
		const data = await fetch("http://localhost:3210/auth/" + id, {
			method: "DELETE",
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return {
			data: await data.json(),
			error: null,
		};
	} catch (e) {
		const error = e as Error;
		return {
			data: null,
			error,
		};
	}
}
