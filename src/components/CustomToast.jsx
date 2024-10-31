import { X } from "lucide-react"
import React from "react"
import toast from "react-hot-toast"
import { ToastBar, Toaster } from "react-hot-toast"
function CustomToast() {
  return (
    <Toaster>
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => {
            t.duration = 1500
            return (
              <>
                {t.type === "error" ? "⛔" : icon}
                {message}
                {t.type !== "loading" && (
                  <button
                    type="button"
                    className="hover:text-blue-500 hover:bg-blue-200 p-1 rounded transition-all duration-150"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <X size={18} className="" />
                  </button>
                )}
              </>
            )
          }}
        </ToastBar>
      )}
    </Toaster>
  )
}

export default CustomToast
