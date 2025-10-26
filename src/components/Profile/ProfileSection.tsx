import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  saving?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

const ProfileSection: React.FC<Props> = ({ title, description, children, saving, onSave, onCancel }) => {
  return (
    <Card className="mb-4">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          <div className="flex items-center gap-2">
            {onCancel && (
              <Button variant="outline" size="sm" onClick={onCancel} type="button">
                Cancel
              </Button>
            )}
            {onSave && (
              <Button variant="destructive" size="sm" onClick={onSave} type="button">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </div>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </Card>
  );
};

export default ProfileSection;
