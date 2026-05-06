import Header from "../components/Header";
import SearchForm from "../components/SearchForm";


export default function HomeView() {
    return (
        <>
            <Header/>

            <main className="bg-gray-100 py-10 min-h-screen lg:bg-[url('public/bg.svg')] bg-no-repeat bg-top-right lg:bg-[length:50%]">
                <div className="max-w-5xl mx-auto mt-10">
                    <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                        <h1 className="text-6xl font-black">
                            Totas tus <span className="text-cyan-400">Redes Sociales</span> en un enlace
                        </h1>

                        <p className="text-salete-880 text-xl">Únete a más de 200 mil developers compartiendo sus redes sociales, compartu tu perfil de Tiktok, Facebook, Instagram, Youtube, GitHub y más</p>

                        <SearchForm/>
                    </div>
                </div>

            </main>
        </>
    )
}
