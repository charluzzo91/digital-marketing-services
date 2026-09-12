import { Mascot } from "./Mascot";
import { Cart } from "./Cart";

/**
 * Composite: approved character art + vector cart.
 * The character is raster because it is detailed illustration; the cart is a simple
 * geometric object, so it stays vector. Sized by the wrapper.
 */
export function MascotWithCart({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-end justify-center ${className ?? ""}`}>
      <Mascot pose="side" alt="" className="relative z-10 h-full w-auto -mr-4" sizes="200px" />
      <Cart className="h-[62%] w-auto" />
    </div>
  );
}
