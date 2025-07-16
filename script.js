


//  hamburger logic
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {

  //  scroll  down and go to price section  / top banner section

  const viewPriceBtn = document.getElementById("price-view-btn");

  if (viewPriceBtn) {
    viewPriceBtn.addEventListener("click", () => {
      const pricingSection = document.getElementById("pricing");

      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      };
    });

  };


  // Explore Courses  / top banner section

  const exploreCourses = document.getElementById("explore-courses-btn")

  if(exploreCourses){
    exploreCourses.addEventListener("click", ()=>{
      window.location.href = '../html/courses.html'
    })
  }


  // get start button pricing section






});