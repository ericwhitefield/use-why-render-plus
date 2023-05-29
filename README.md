# use-why-render-plus

## Quickly view all the reasons your React hook component (re)rendered

A zero-config hook with pretty console output.

Drop in a single line of code with this hook to view component render count, reason, and prop values.

Spot re-renders vs new renders from count zero.

### Example usage

```tsx
export default function MyComponent({
  init,
  text,
  count,
}: {
  init: string;
  text?: string;
  count?: number;
}) {
  const [name, setName] = useState(init);

  useWhyRenderPlus("MyComponent", {
    name,
    text,
    count,
  });

  return <h1>MyComponent</h1>;
}
```

### Example output

![example console output](https://github.com/ericwhitefield/use-why-render-plus/blob/main/images/exmaple.png?raw=true)

### Options

Configure the output how you like. For exmaple, highlight only value changes, or put full state output on each re-rener.

```tsx
const optionsDefault: OPTIONS = {
  on_change: true, // print the param name when it changes
  on_same: false, // print the param name even when it has not changed
  val_previous: false, // include previous value on print
  val_current: false, // include current value on print
  color_header: "#ad04db",
  color_params: "#e205ff",
  logger: console.log,
};

export const useWhyRenderPlus = (
  label: string,
  deps?: Record<string, any>,
  options: Partial<OPTIONS> = optionsDefault
): void => {};
```
