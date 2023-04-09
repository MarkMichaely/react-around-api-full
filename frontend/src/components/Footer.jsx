export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="footer">
			<p className="footer__copyright">{`© ${year} Mark Michaely`}</p>
		</footer>
	);
}
