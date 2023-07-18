import Link from "next/link";
import Navbar from "@/components/navbar";

export default function Home() {
	return (
		<main>
			<Navbar />
			<section className="flex justify-between mb-4 items-center m-4 mt-5">
				<Link
					href="/signin"
					className="w-50 h-100 mt-5 text-2xl btn btn-outline-light"
				>
					<h1>Signin</h1>
				</Link>
				<h1 className=" mx-4 mt-5 text-xl">Or</h1>
				<Link
					href="/signup"
					className="w-50 mt-5 text-2xl btn btn-outline-light "
				>
					<h1>Sign up</h1>
				</Link>
			</section>
		</main>
	);
}
