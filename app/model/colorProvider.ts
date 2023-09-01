const COLORS = [
  "#4CCA8D",
  "#D65C5C",
  "#71B7F8",
  "#e6d800", 
  "#9b19f5",
  "#ffa300",
  "#dc0ab4",
  "#b3d4ff",
  "#00bfa0"
]

export class ColorProvider {
  private static colorIndex = 0
  static getColor() {
    const color = COLORS[this.colorIndex];
    this.colorIndex++;
    if (this.colorIndex >= COLORS.length) {
      this.colorIndex = 0;
    }
    return color;
  }
}