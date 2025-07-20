const coursesCard = document.querySelectorAll(".course-card")

coursesCard.forEach((card) => {
  card.addEventListener("click", () => {

    if (confirm("Please Login First")) {
      window.location.href = "../html/signup-page.html"
    }
  })
})