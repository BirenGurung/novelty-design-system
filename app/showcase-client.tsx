"use client";

import { useState } from "react";
import type { DialogSize, DialogVariant, ModalSize } from "@/components";
import { Button, Icon, Modal, Dialog } from "@/components";

const successIcon = <Icon name="check-circle-fill" className="size-full" />;

export function ShowcaseClient() {
  const [modalSize, setModalSize] = useState<ModalSize | null>(null);
  const [dialogState, setDialogState] = useState<{ variant: DialogVariant; size: DialogSize } | null>(null);

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="filled" size="medium" onClick={() => setModalSize("small")}>
        Open Small Modal
      </Button>
      <Button variant="filled" size="medium" onClick={() => setModalSize("default")}>
        Open Default Modal
      </Button>
      <Button variant="filled" size="medium" onClick={() => setModalSize("large")}>
        Open Large Modal
      </Button>
      <Button variant="outline" size="medium" onClick={() => setDialogState({ variant: "icon", size: "default" })}>
        Dialog (Icon, Default)
      </Button>
      <Button variant="outline" size="medium" onClick={() => setDialogState({ variant: "icon", size: "compact" })}>
        Dialog (Icon, Compact)
      </Button>
      <Button variant="outline" size="medium" onClick={() => setDialogState({ variant: "basic", size: "default" })}>
        Dialog (Basic, Default)
      </Button>
      <Modal
        open={modalSize !== null}
        onClose={() => setModalSize(null)}
        title={modalSize ? `Modal (${modalSize})` : "Modal"}
        size={modalSize ?? "default"}
        primaryActionLabel="Save"
        onPrimaryAction={() => setModalSize(null)}
      >
        <p className="text-[var(--color-text)]">Swappable content goes here.</p>
      </Modal>
      <Dialog
        open={dialogState !== null}
        onClose={() => setDialogState(null)}
        title={dialogState ? `Dialog (${dialogState.variant}, ${dialogState.size})` : "Dialog Title"}
        actionLabel="Action 1"
        onAction={() => setDialogState(null)}
        variant={dialogState?.variant ?? "icon"}
        size={dialogState?.size ?? "default"}
        icon={dialogState?.variant === "icon" ? successIcon : undefined}
      >
        <p>Lorem ipsum dolor sit amet.</p>
      </Dialog>
    </div>
  );
}
