import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="h-[calc(100vh-96px)] flex items-center justify-center">
            <SignIn
                appearance={{
                    elements: {
                        formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white",
                        headerTitle: "text-xl font-bold text-gray-800",
                    },
                }}
            />
        </div>
    );
}
