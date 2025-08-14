<script>
  import { jsPDF } from "jspdf";
  const doc = new jsPDF();

  function handleClick() {
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
  }
</script>

<button on:click={handleClick}>Click for PDF</button>
