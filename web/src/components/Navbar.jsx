import { Link, useLocation } from 'react-router';
import { useAuthUser } from '../hooks/useAuthUser';
import { useLogout } from '../hooks/useLogout';
import { BellIcon, LogOutIcon, UsersIcon } from 'lucide-react';

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
                        <div className="min-w-0 flex-1">
                            <Link
                                to="/"
                                className="flex items-center gap-2.5 min-w-0"
                            >
                                <span
                                    className="inline-block text-3xl tracking-wider bg-clip-text text-transparent bg-[#134fd6] from-primary to-secondary truncate"
                                    style={{ fontFamily: "MomoSignature" }}
                                >
                                    Lun'ri
                                </span>
                            </Link>
                        </div>
                    ) : (
                        <div />
                    )}

                    <div className="flex items-center gap-2 sm:gap-4 md:gap-5 lg:gap-6 shrink-0">

                        {/* Friends
                            - Visible on mobile/tablet when sidebar is hidden
                            - Always visible on chat page
                        */}
                        <Link
                            to="/friends"
                            aria-label="Friends"
                            className={isChat ? "" : "lg:hidden"}
                        >
                            <button
                                type="button"
                                className="btn btn-ghost btn-circle"
                            >
                                <UsersIcon
                                    aria-hidden="true"
                                    className="h-6 w-6 text-base-content opacity-70"
                                />
                            </button>
                        </Link>

                        {/* Notifications */}
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

                        {/* User Avatar */}
                        <div className="avatar">
                            <div className="w-9 rounded-full">
                                <img
                                    src={authUser?.profilePic}
                                    alt={authUser?.fullName || "User Avatar"}
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>

                        {/* Logout */}
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