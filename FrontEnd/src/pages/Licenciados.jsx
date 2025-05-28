import imagineSeLogo from '../assets/licenses/MB.png'
import pkxdLogo from '../assets/licenses/PKXD.png'
import hasbroLogo from '../assets/licenses/hasbro.png'
import luccasNetoLogo from '../assets/licenses/LCN.png'

export default function Licenciados() {
    return (
        <div className="flex flex-col items-center mt-48 mb-10 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#7F42CE] mb-12 drop-shadow-md text-center"
                style={{
                    color: '#FFDB08',
                    fontFamily: '"Baloo Bhai 2", sans-serif',
                    textShadow: '1px 1px 2px black',
                }}
            >
                Licenciados
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 md:gap-x-24 md:gap-y-16 w-full max-w-3xl">
                <div className="flex justify-center items-center">
                    <a href="https://www.mundobita.com.br/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100">
                        <img src={imagineSeLogo} alt="Mundo bita" className="w-40 md:w-48 h-auto" />
                    </a>
                </div>
                <div className="flex justify-center items-center">
                    <a href="https://www.playpkxd.com/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100">
                        <img src={pkxdLogo} alt="PKXD" className="w-40 md:w-48 h-auto" />
                    </a>
                </div>
                <div className="flex justify-center items-center">
                    <a href="https://shop.hasbro.com/pt-br" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100">
                        <img src={hasbroLogo} alt="Hasbro" className="w-32 md:w-40 h-auto rotate-[-10deg]" />
                    </a>
                </div>
                <div className="flex justify-center items-center">
                    <a href="https://www.youtube.com/@luccastoon" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100">
                        <img src={luccasNetoLogo} alt="Luccas Neto" className="w-32 md:w-40 h-auto" />
                    </a>
                </div>
            </div>
        </div>
    )
}