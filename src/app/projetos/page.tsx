import { projects } from "@/data/projects";
import { ExternalLink } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Projetos",
    description: "Página de projetos do criador",
};

export default function page() {
    return (
        <div className="px-6 w-full mx-auto max-w-7xl">
            <h1 className="text-center my-8 text-xl font-bold">Outros Projetos</h1>
            <p className="text-center mb-4 text-lg">Esta área é dedicada para outros projetos relavantes desenvolvidos por mim.</p>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                {projects.map((project) => (
                    <article
                        key={project.title}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary-dark bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-xl"
                    >
                        <div className="relative aspect-video overflow-hidden bg-gray-100">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        </div>

                        <div className="flex flex-1 flex-col p-6 sm:p-8">
                            <h3 className="mb-3 text-2xl font-bold text-primary">
                                {project.title}
                            </h3>

                            <p className="mb-6 flex-1 text-gray-600 leading-relaxed">
                                {project.description}
                            </p>

                            {project.tags && (
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <Link
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-blue-600"
                            >
                                <span>Visitar projeto</span>
                                <ExternalLink
                                    size={16}
                                    className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}