import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function NewPlaylistPage() {
  return (
    <div className="container max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Create New Playlist</h1>
          <p className="text-muted-foreground">
            Describe the vibe you're looking for and we'll create a playlist for
            you.
          </p>
        </div>

        <div className="space-y-4">
          <Textarea
            placeholder="Example: A chill lofi playlist perfect for late night coding sessions with a mix of ambient sounds and soft beats..."
            className="min-h-[200px]"
          />

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Cancel</Button>
            <Button>Create Playlist</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
