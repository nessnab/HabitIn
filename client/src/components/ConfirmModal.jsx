
function ConfirmModal({
  message,
  onConfirm,
  onCancel
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 space-y-4 text-center rounded">
        <p className="text-secondary">{message}</p>

        <div className="flex gap-4 mt-4">
          <button onClick={onConfirm} className="px-4 py-2 bg-white rounded hover:bg-red-500 cursor-pointer text-primary hover:text-white">
            Confirm
          </button>

          <button onClick={onCancel} className="px-4 py-2 bg-primary rounded hover:bg-primary-light cursor-pointer text-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal;