export function getTextColor(hexColor: string) {
  // Convert hex color code to RGB values
  let red = parseInt(hexColor.substring(1, 3), 16);
  let green = parseInt(hexColor.substring(3, 5), 16);
  let blue = parseInt(hexColor.substring(5, 7), 16);

  // Calculate perceived brightness
  let brightness = (0.299 * red) + (0.587 * green) + (0.114 * blue);

  // Set text color based on brightness
  if (brightness > 186) {
    return "#000000"; // black
  } else {
    return "#ffffff"; // white
  }
};