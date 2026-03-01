import { IoIosCheckmarkCircleOutline, IoIosInformationCircleOutline } from "react-icons/io"
import { BiErrorCircle } from "react-icons/bi"
import { cn } from "@/lib/utils"

const Alert = ({ success, error, message }: { success?: boolean, error?: boolean, message: string }) => {
    return (
        <div className={cn("my-2 gap-2 p-3 items-center flex rounded-md",
            success && "bg-green-100 text-green-500",
            error && "bg-red-100 text-red-500",
            !success && !error && "bg-blue-100 text-blue-500"
        )}>
            <span>
                {success && <IoIosCheckmarkCircleOutline size={20} />}
                {error && <BiErrorCircle size={20} />}
                {!success && !error && <IoIosInformationCircleOutline size={20} />}
            </span>
            <span>
                {message}
            </span>
        </div >
    )
}

export default Alert