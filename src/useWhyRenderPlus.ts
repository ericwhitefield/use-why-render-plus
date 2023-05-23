import { useEffect, useRef } from "react";

type OPTIONS = {
  on_change: boolean;
  on_same: boolean;
  val_previous: boolean;
  val_current: boolean;
  color_header: string;
  color_params: string;
  logger: any;
};

const optionsDefault: OPTIONS = {
  on_change: true, // print the param when it changes
  on_same: false, // print param out even when it has not changed
  val_previous: false, // include previous value on print
  val_current: false, // include current value on print
  color_header: "#ad04db",
  color_params: "#e205ff",
  logger: console.log,
};

export const useWhyRenderPlus = (
  label: string,
  deps: Record<string, any>,
  options: Partial<OPTIONS> = optionsDefault
): void => {
  const opt = { ...optionsDefault, ...options };

  const renders = useRef(0);
  const prevDeps = useRef(null);

  const style = {
    header: `color:${opt?.color_header || "#ad04db"}; font-weight:bold`,
    params: `color:${opt?.color_params || "#e205ff"}; font-weight:bold`,
  };

  const logger = opt.logger;
  logger("");
  logger("%c =============== WHY ===============", style.header);
  logger(`%c ${label} = ${renders.current}`, style.header);

  useEffect(() => {
    renders.current++;
  });

  const hasPrevious = prevDeps.current !== null;

  let changed = false;

  if (deps) {
    Object.keys(deps).forEach((k) => {
      const d = deps[k];

      const same = !hasPrevious ? false : d === prevDeps.current?.[k];

      const msg = !hasPrevious ? "INIT  " : same ? "SAME  " : "CHANGE";

      const print_same = same && opt.on_same;
      const print_change = !same && opt.on_change;

      if (!same) changed = true; // at least one has changed

      if (print_same || print_change) {
        logger(`%c    ${msg}:\t${k}`, style.params);

        if (opt.val_previous && hasPrevious) {
          logger(opt.val_previous && hasPrevious ? prevDeps.current[k] : "");
        }

        if (opt.val_current) {
          logger(opt.val_current ? d : "");
        }
      }
    });

    if (changed) prevDeps.current = deps;
  }
};
