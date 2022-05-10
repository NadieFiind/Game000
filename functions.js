function touchStarted() {
	if (touchMode === 2) {
		joyMove.activateJoystick(true);
		joyView.activateJoystick(true);
		return false;
	}
}
function touchEnded() {
	if (touchMode === 2) {
		joyMove.activateJoystick(false);
		joyView.activateJoystick(false);
		return false;
	}
}