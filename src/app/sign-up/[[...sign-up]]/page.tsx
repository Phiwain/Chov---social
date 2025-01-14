import {ClerkProvider, SignIn, SignUp} from '@clerk/nextjs'
import {frFR} from "@clerk/localizations";

export default function Page() {

    return (
        <ClerkProvider localization={frFR}>
            <div className="h-[calc(100vh-96px)] flex items-center justify-center">
                <SignUp/>
            </div>
        </ClerkProvider>);
}