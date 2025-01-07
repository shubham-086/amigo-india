import Link from "next/link";

const PageHeader = ({ img, title }) => {
  return (
    <div className="relative bg-primary md:py-10 mb-10 bg-cover bg-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${img})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative container mx-auto py-5">
        <div className="flex flex-col items-center justify-center py-5">
          <h1 className="text-4xl md:text-6xl font-bold text-white animate-slideInDown">
            {title}
          </h1>
          <nav aria-label="breadcrumb" className="mt-4">
            <ol className="flex space-x-2 text-white">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li aria-current="page" className="font-semibold">
                {title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
