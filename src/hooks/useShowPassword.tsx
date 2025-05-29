import { useState } from 'react'

const useShowPassword = () => {
	const [show, setShow] = useState<boolean>(false)
	const [showConfirm, setShowConfirm] = useState<boolean>(false)

	const toggleShow = () => setShow(prev => !prev)
	const toggleShowConfirm = () => setShowConfirm(prev => !prev)

	return { show, toggleShow, showConfirm, toggleShowConfirm }
}

export default useShowPassword
