import { customAlphabet } from "nanoid";

const nanoid = (size: number | undefined): number =>
    parseInt(customAlphabet("123456789", 10)(size));

export default nanoid;
