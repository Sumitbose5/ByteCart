import React from "react";
import { Show, SignInButton, SignUpButton, UserButton, useAuth, useClerk } from "@clerk/react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const { email } = useUserContext();

  const handleBecomeSeller = async () => {
    if (isSignedIn) {
      try {
        const response = await fetch(`http://localhost:3000/api/seller/check-role/${email}`, {
          method: "GET",
        });
        const data = await response.json();
        if (data.role === "seller") {
          navigate("/dashboard");
        } else {
          navigate("/sellerOnboard");
        }
      } catch (error) {
        console.error("Error checking role:", error);
        navigate("/sellerOnboard");
      }
    } else {
      openSignIn({ forceRedirectUrl: "/sellerOnboard" });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-bold">ByteCart</Link>
          <div className="hidden md:flex gap-8">
            <Link to="/" className="text-indigo-600 font-semibold border-b-2 border-indigo-600">
              Explore
            </Link>
            {/* <a className="text-gray-600 hover:text-indigo-500">Sell Code</a> */}
            <button onClick={handleBecomeSeller} className="text-gray-600 hover:text-indigo-500 cursor-pointer">
              Become a Seller
            </button>
          </div>
        </div>

      <div className="flex items-center gap-6">
        <Show when="signed-out">
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
             <a className="text-gray-600 hover:text-indigo-500 cursor-pointer">Login</a>
          </SignInButton>
          <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
             <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold cursor-pointer">
               Sign Up
             </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </div>
  </nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const { email } = useUserContext();

  const handleBecomeSeller = async () => {
    if (isSignedIn) {
      try {
        const response = await fetch(`http://localhost:3000/api/seller/check-role/${email}`, {
          method: "GET",
        });
        const data = await response.json();
        if (data.role === "seller") {
          navigate("/dashboard");
        } else {
          navigate("/sellerOnboard");
        }
      } catch (error) {
        console.error("Error checking role:", error);
        navigate("/sellerOnboard");
      }
    } else {
      openSignIn({ forceRedirectUrl: "/sellerOnboard" });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-8 py-24 text-center">
      <h1 className="text-5xl lg:text-7xl font-extrabold mb-6">
        Buy & Sell Code,{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-500">
          Made Simple
        </span>
      </h1>

      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
        Find ready-made projects or earn by selling your code.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold cursor-pointer">
          Explore Projects
        </button>
        <button onClick={handleBecomeSeller} className="bg-gray-200 px-10 py-4 rounded-xl font-bold cursor-pointer">
          Become a Seller
        </button>
      </div>
    </section>
  );
};

const SearchBar = () => (
  <section className="bg-gray-100 py-12 px-8">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-2 rounded-2xl shadow flex flex-col md:flex-row gap-2">
        <input
          className="flex-1 px-4 py-3 outline-none"
          placeholder="Search projects..."
        />

        <select className="px-4 py-2 rounded-xl">
          <option>Category</option>
          <option>Web Apps</option>
        </select>

        <select className="px-4 py-2 rounded-xl">
          <option>Price</option>
          <option>$0-$50</option>
        </select>
      </div>
    </div>
  </section>
);

type Project = {
  title: string;
  price: string;
  image: string;
  author: string;
};

const projects: Project[] = [
  {
    title: "SaaS Dashboard",
    price: "$49",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA1P-uUsTtvIZtwJKPm1JyIMxm9sQoPPgoG9ygRzeZgaPJcy8FeNzg-T59qLu-sbrakiKFQjFo5lGOb3Oxo1AMoF4xdP-uILGha_EBqEG6uaARCYmyzPABecsAZpmqND8xjWQhx1FUS1WjyRAcZ4AmIYkkshutl6dFS9utfpc7_9XeWzpciwqJPkSo35YomFRzrWWRRkhgm6SZEQtRbP_Yu7PYf1cBDmyRzVjFLJOOS-dcPhgzLZ6eWeRkh99TSrYTPo9BEUOzqsP4",
    author: "JohnDev",
  },
  {
    title: "Fitness Tracker",
    price: "$29",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTPA1JfrNNeBMhrEXpsosmm-7sIEFhvi1CNwk6SfBVdaGDSOm0yt_DEqG2QacCwsvy0a-k_rGj4jQEclG0EbCho_-xQseF8UYtcy1vYXP7FG5c8nOrijNQTnjJLR7Da6GaCIfPvS5xwvIiJcF7F-jkFPwcNwjirOFqH7O5MkW34lQElxCSF20k0v8uaI-YGHhdEskKcjXzB3mFbkiUpL8LYr7gD3sbI_GdYmuUiTkJiwdGCKNiuUQOVNN7Vbz-syK97E8EhEYDwas",
    author: "AlexK",
  },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
    <img src={project.image} className="w-full h-48 object-cover" />
    <div className="p-6">
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">{project.title}</h3>
        <span className="text-indigo-600 font-bold">
          {project.price}
        </span>
      </div>
      <p className="text-sm text-gray-500">by {project.author}</p>
    </div>
  </div>
);

const Projects = () => (
  <section className="max-w-7xl mx-auto px-8 py-20">
    <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((p, i) => (
        <ProjectCard key={i} project={p} />
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-10 text-center bg-gray-100">
    <p className="text-gray-500">© 2026 ByteCart</p>
  </footer>
);

const Home: React.FC = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <SearchBar />
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default Home;