import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="h-[calc(100vh-96px)] flex items-center justify-center">
            <SignUp
                appearance={{
                    elements: {
                        formButtonPrimary: "bg-green-500 hover:bg-green-600 text-white",
                        headerTitle: "text-xl font-bold text-gray-800",
                    },
                }}
            />
        </div>
    );
}
