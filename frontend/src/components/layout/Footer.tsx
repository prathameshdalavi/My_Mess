export const Footer = () => {
    return (
        <footer className="bg-[#154313] text-white py-6 mt-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
                <p>&copy; {new Date().getFullYear()} Aai's Kitchen. All rights reserved.</p>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Terms</a>
                    <a href="#" className="hover:underline">Contact</a>
                </div>
            </div>
        </footer>
    );
};