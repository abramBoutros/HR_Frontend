import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="container">
			<header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
				<a
					href="/"
					className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
				>
					<span className="fs-4 text-slate-100">HR System</span>
				</a>

				<ul className="nav nav-pills">
					<Link href="/" className="   text-2xl btn mx-4 btn-light">
						<h1>Home</h1>
					</Link>{" "}
					<li className="nav-item">
						<Link
							href="/signup"
							className="mx-2 text-2xl btn btn-outline-light"
						>
							<h1>Sign up</h1>
						</Link>
					</li>
					<li className="nav-item">
						<Link
							href="/signin"
							className="mx-2 text-2xl btn btn-outline-light"
						>
							<h1>Sign in</h1>
						</Link>
					</li>
				</ul>
			</header>
		</nav>
	);
}
