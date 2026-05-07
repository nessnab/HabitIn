
function Footer() {
  return (

<footer className="mt-16 border-t border-gray-300 backdrop-blur">
  <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between text-md text-gray-500">
    
    {/* <!-- Left --> */}
    <div className="flex gap-4 mt-2 md:mt-0">
      <a href="https://github.com/nessnab" target="_blank" className="hover:text-secondary transition">
        GitHub
      </a>
      <a href="https://linkedin.com/in/nessnab" target="_blank" className="hover:text-secondary transition">
        LinkedIn
      </a>
      <a href="https://instagram.com/nessnab" target="_blank" className=" hover:text-secondary transition">
        Instagram
      </a>
    </div>
    
    {/* <!-- Right --> */}
    <p>
      © 2026 HabitIn.
      Built with consistency by Ness
    </p>

  </div>
</footer>
  )
}

export default Footer;
