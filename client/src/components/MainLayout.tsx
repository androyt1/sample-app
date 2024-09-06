import { ReactNode } from "react";
import Navbar from "./Navbar";

type LayoutProp = {
    children: ReactNode;
};

const MainLayout = ({ children }: LayoutProp) => {
    return (
        <div className='min-h-screen w-full flex flex-col'>
            <Navbar />
            <main className='flex-1 flex flex-col'>{children}</main>
        </div>
    );
};

export default MainLayout;
