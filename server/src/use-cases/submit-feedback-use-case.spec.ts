import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Tem um bug',
      screenshot: 'data:image/png;base64,asfv46b364b3tvtv',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback whitout type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Tem um bug',
      screenshot: 'data:image/png;base64,asfv46b364b3tvtv',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback whitout comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,asfv46b364b3tvtv',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot format', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'tem um bug',
      screenshot: 'test.png',
    })).rejects.toThrow();
  });
});
