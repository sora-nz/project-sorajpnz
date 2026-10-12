import './TheaLessonVisual.css';

export function TheaLessonVisual() {
  return (
    <div className="thea-lesson-visual" aria-hidden="true">
      <div className="thea-lesson-paper">
        <span className="thea-lesson-paper-label">IELTS</span>
        <span className="thea-lesson-paper-title">Writing Task 2</span>
        <span className="thea-lesson-line thea-lesson-line-one" />
        <span className="thea-lesson-line thea-lesson-line-two" />
        <span className="thea-lesson-line thea-lesson-line-three" />
        <span className="thea-lesson-line thea-lesson-line-four" />
        <span className="thea-lesson-edit" />
        <span className="thea-lesson-margin-note">Aa</span>
      </div>
      <i className="ri-pencil-line thea-lesson-pencil" />
      <i className="ri-chat-1-line thea-lesson-feedback" />
    </div>
  );
}
