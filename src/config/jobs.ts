/**
 * Google Form settings for job applications.
 *
 * 1. In Google Forms, click Send → the "<>" (embed) tab, and copy the URL in
 *    the iframe's src. It looks like:
 *    https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true
 *    Paste it into `formUrl` below (the plain /viewform link also works).
 *
 * 2. Optional: pre-fill the "Job" question with the job title so you know
 *    which role each response is for. In Google Forms, open ⋮ → "Get
 *    pre-filled link", type anything into the Job question, click "Get link",
 *    and copy the `entry.XXXXXXX` part of the URL into `jobFieldEntryId`.
 *
 * A single job can use a different form by setting `applicationForm` in its
 * Markdown front matter.
 */
export const jobApplicationForm = {
  formUrl: '',
  jobFieldEntryId: '',
  // Google Forms can't resize to fit the page, so set a height (in px)
  // that shows the whole form without an inner scrollbar.
  height: 1600,
};

export function buildFormEmbedUrl(baseUrl: string, jobTitle: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set('embedded', 'true');
  if (jobApplicationForm.jobFieldEntryId) {
    url.searchParams.set('usp', 'pp_url');
    url.searchParams.set(jobApplicationForm.jobFieldEntryId, jobTitle);
  }
  return url.toString();
}

export function buildFormOpenUrl(embedUrl: string): string {
  const url = new URL(embedUrl);
  url.searchParams.delete('embedded');
  return url.toString();
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
