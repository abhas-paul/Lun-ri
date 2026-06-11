import { Link, useLocation } from 'react-router';
import { useAuthUser } from '../hooks/useAuthUser';
import { useLogout } from '../hooks/useLogout';
import { BellIcon, LogOutIcon } from 'lucide-react';

function Navbar() {

    const {
        data: authResponse,
        isLoading,
        isError,
    } = useAuthUser();

    const authUser = authResponse?.user;

    const location = useLocation();
    const currentPath = location.pathname;

    const isChat = location.pathname?.startsWith("/chat");

    const { mutate: logout, isPending } = useLogout();

    return (
        <nav
            aria-label="Primary navigation"
            className="bg-[#151515] border-b border-base-300 sticky top-0 z-30 h-16 flex items-center"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between w-full">

                    {/* LOGO IF WE ARE IN CHAT PAGE */}
                    {isChat ? (
                        <div className="pl-5">
                            <Link to="/" className="flex items-center gap-2.5">
                                <span
                                    className="inline-block text-3xl tracking-wider bg-clip-text text-transparent bg-[#134fd6] from-primary to-secondary"
                                    style={{ fontFamily: "MomoSignature" }}
                                >
                                    Lun'ri
                                </span>
                            </Link>
                        </div>
                    ) : (
                        <div />
                    )}

                    <div className="flex items-center gap-5 sm:gap-6">
                        <Link
                            to="/notifications"
                            aria-label="Notifications"
                        >
                            <button
                                type="button"
                                className="btn btn-ghost btn-circle"
                            >
                                <BellIcon
                                    aria-hidden="true"
                                    className="h-6 w-6 text-base-content opacity-70"
                                />
                            </button>
                        </Link>

                        <div className="avatar">
                            <div className="w-9 rounded-full">
                                <img
                                    src={authUser?.profilePic}
                                    alt={authUser?.fullName || "User Avatar"}
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn btn-ghost btn-circle"
                            onClick={() => logout()}
                            disabled={isPending}
                            aria-label="Logout"
                        >
                            {isPending ? (
                                <span
                                    className="loading loading-dots loading-xl"
                                    aria-label="Loading"
                                />
                            ) : (
                                <LogOutIcon
                                    aria-hidden="true"
                                    className="h-6 w-6 text-base-content opacity-70"
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;