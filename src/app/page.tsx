import { db } from "@/db";

export default async function Page() {
    const allCategories = (await db.category.findMany({
        select: {
            name: true,
            slug: true,
            cards: true
        },
    }));

    const categoriesExcludingMistakes = allCategories.filter((category) => category.slug !== "mistakes");

    const mistakesCategoryData = allCategories.find((category) => category.slug === "mistakes")

    return (
        <div className="container w-full max-w-2xl pt-20 mx-auto flex flex-col gap-8">
            {mistakesCategoryData?.cards.length ? (<>
                <h1 className="text-2xl font-bold">Train Mistakes</h1>
                <ul className="flex flex-col gap-4 w-full">
                    <li>
                        <a
                            href="/mistakes"
                            className="w-full flex flex-row justify-between p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {mistakesCategoryData?.name}
                            </h5>
                            <h5 className="inline-flex items-center justify-center w-8 h-8 ms-2 text-lg font-bold text-blue-800 bg-blue-200 rounded-full">
                                {mistakesCategoryData?.cards.length}
                            </h5>
                        </a>
                    </li>
                </ul>
            </>) : null}

            <h1 className="text-2xl font-bold">All Categories</h1>
            <ul className="flex flex-col gap-4 w-full">
                {categoriesExcludingMistakes.map(({ name, slug, cards }, index) => (
                    <li key={index}>
                        <a
                            href={slug}
                            className="w-full flex flex-row justify-between p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {name}
                            </h5>
                            {/* <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {cards.length}
                            </h5> */}
                            <h5 className="inline-flex items-center justify-center w-8 h-8 ms-2 text-lg font-bold text-blue-800 bg-blue-200 rounded-full">
                                {cards.length}
                            </h5>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
