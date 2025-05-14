import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ReviewSubmissionForm = ({
  submissionId,
  reviewRoundId, 
  onSubmit
}: {
  submissionId: string;
  reviewRoundId: string;
  onSubmit: (data: any) => Promise<void>;
}) => {
  const [recommendation, setRecommendation] = useState("");
  const [comments, setComments] = useState("");
  const [confidentialComments, setConfidentialComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!recommendation) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({
        reviewRoundId,
        submissionId,
        recommendation,
        comments,
        confidentialComments
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Recommendation</Label>
        <Select onValueChange={setRecommendation} value={recommendation}>
          <SelectTrigger>
            <SelectValue placeholder="Select recommendation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accept">Accept</SelectItem>
            <SelectItem value="minor_revisions">Minor Revisions</SelectItem>
            <SelectItem value="major_revisions">Major Revisions</SelectItem>
            <SelectItem value="reject">Reject</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Comments to Author</Label>
        <Textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Enter your comments for the author"
          rows={5}
        />
      </div>

      <div>
        <Label>Confidential Comments to Editor</Label>
        <Textarea
          value={confidentialComments}
          onChange={(e) => setConfidentialComments(e.target.value)}
          placeholder="Enter confidential comments for the editor"
          rows={3}
        />
      </div>

      <div className="flex justify-end">
        <Button
          disabled={!recommendation || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          Submit Review
        </Button>
      </div>
    </div>
  );
};