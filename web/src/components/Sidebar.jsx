import { Link, useLocation } from "react-router";
import { useAuthUser } from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, UsersIcon } from "lucide-react";

function Sidebar() {
    const {
        data: authResponse,
        isLoading,
        isError,
    } = useAuthUser();

    const authUser = authResponse?.user;

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <aside
            aria-label="Primary sidebar"
            className="w-64 bg-[#151515] border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0"
        >
            <div className="p-5 border-b border-base-300 h-16">
                <h1>
                    <Link
                        to="/"
                        className="inline-block text-3xl tracking-wider bg-clip-text text-transparent bg-[#134fd6] from-primary to-secondary"
                        style={{ fontFamily: "MomoSignature" }}
                    >
                        Lun'ri
                    </Link>
                </h1>
            </div>

            <nav
                aria-label="Main navigation"
                className="flex-1 p-4 space-y-1"
            >
                <Link
                    to="/"
                    aria-current={currentPath === "/" ? "page" : undefined}
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""
                        }`}
                >
                    <HomeIcon
                        aria-hidden="true"
                        className="size-5 text-base-content opacity-70"
                    />
                    <span
                        style={{ fontFamily: "SpaceGrotesk" }}
                        className="tracking-wide"
                    >
                        Home
                    </span>
                </Link>

                <Link
                    to="/friends"
                    aria-current={currentPath === "/friends" ? "page" : undefined}
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/friends" ? "btn-active" : ""
                        }`}
                >
                    <UsersIcon
                        aria-hidden="true"
                        className="size-5 text-base-content opacity-70"
                    />
                    <span
                        style={{ fontFamily: "SpaceGrotesk" }}
                        className="tracking-wide"
                    >
                        Friends
                    </span>
                </Link>

                <Link
                    to="/notifications"
                    aria-current={
                        currentPath === "/notifications" ? "page" : undefined
                    }
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/notifications" ? "btn-active" : ""
                        }`}
                >
                    <BellIcon
                        aria-hidden="true"
                        className="size-5 text-base-content opacity-70"
                    />
                    <span
                        style={{ fontFamily: "SpaceGrotesk" }}
                        className="tracking-wide"
                    >
                        Notifications
                    </span>
                </Link>
            </nav>

            <footer className="p-4 border-t border-base-300 mt-auto">
                {isLoading ? (
                    <div className="flex items-center gap-3">
                        <div className="skeleton w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <div className="skeleton h-4 w-24 mb-2" />
                            <div className="skeleton h-3 w-16" />
                        </div>
                    </div>
                ) : isError ? (
                    <div className="text-sm text-error">
                        Failed to load profile
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src={authUser?.profilePic}
                                    alt={authUser?.name || "User Avatar"}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://res.cloudinary.com/damorpif0/image/upload/v1781157181/gdjvejngracx6eeup2vh.webp";
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">
                                {authUser?.name || "Unknown User"}
                            </p>

                            <p className="text-xs text-success flex items-center gap-1">
                                Online
                            </p>
                        </div>
                    </div>
                )}
            </footer>
        </aside>
    );
}

export default Sidebar;