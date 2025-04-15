import KConnect from '../assets/kfupmConnectLogo.png';

const Header = ()=> {
    return(
        <div className="fixed top-0 left-0 h-20 w-full z-50 bg-n-8/90 
        backdrop-blur-sm border-b border-n-6 lg:bg-n-8/90
        lg:backdrop-blur-sm">
        
            <div className="flex items-center justify-between px-5 lg:px-7.5
            xl:px-10 h-full">
                <a className='block w-[12rem] xl:mr-8'>
                    <img src={KConnect} width={190} height = {40} alt="KFUPM Connect Logo"/>
                </a>

                <nav className='hidden md:flex top-[5rem] 
                left-0 right-0 bottom-0 bg-n-8 lg:flex 
                lg:mx-auto lg:bg-transparent'>
                    
                    <div className='relative z-2 flex flex-col items-center
                    justify-center m-auto lg:flex-row md:flex-row'>
                        <a href='#Home' className={`block relative font-code text-2xl text-n-1 transition-colors hover:text-blue-500 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold md:text-sm md:font-semibold`}>Home</a> 

                        <a href='#Events' className={`block relative font-code text-2xl text-n-1 transition-colors hover:text-blue-500 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold md:text-sm md:font-semibold`}>Events</a>

                        <a href='#Profile' className={`block relative font-code text-2xl text-n-1 transition-colors hover:text-blue-500 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold md:text-sm md:font-semibold`}>Profile</a>
                    </div>
                </nav>

                <a href="#Notification" className='button hidden md:block mr-8 text-n-1/50 transition-colors hover:hover:text-blue-500 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:block md:text-sm md:font-semibold'>Notification</a>
            </div>
        </div>
    );
};

export default Header;