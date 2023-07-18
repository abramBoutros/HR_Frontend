import { useRouter } from "next/navigation";

export default function UserCard({ user , handleDelete}) {
	const { push } = useRouter();

	const clicked = () => {
		push(`/dashboard//${user.id}`);
	};

	return (
		<div className="card w-100 p-1 m-3">
			<div className="card-body">
				<h5 className="card-title">User Name : {user.name}</h5>
				<h6 className="card-subtitle mb-2 text-body-secondary">
					Id: {user.id}
				</h6>
				<p className="card-text">Email: {user.email}</p>
				<p className="card-text">Role: {user.role}</p>
				<p className="card-text">
					Attendance: {user.attendance || "To be added"}
				</p>
				<div className="w-25  m-2 text-2xl btn btn-primary" onClick={clicked}>
					{" "}
					edit
				</div>
				<div className="w-25  m-2 text-2xl btn btn-danger" onClick={(e) => handleDelete(user.id)}>
					{" "}
					delete
				</div>
			</div>
		</div>
	);
}
