import { useState, useEffect, useMemo } from 'react';
import { QUESTION_FLOW } from '../data/questionFlow';

export default function usePersonaWizard() {
  const [step, setStep] = useState(1);
  const [personaType, setPersonaType] = useState(null);
  const [objective, setObjective] = useState(null);
  const [currentQId, setCurrentQId] = useState(null);
  const [qHistory, setQHistory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [samples, setSamples] = useState([{ id: Date.now(), text: '', source: 'facebook', customSource: '' }]);

  useEffect(() => {
    if (step === 2 && personaType && !currentQId) {
      setCurrentQId(QUESTION_FLOW[personaType].start);
      setQHistory([]);
    }
  }, [step, personaType, currentQId]);

  const questionProgress = useMemo(() => {
    if (!personaType || !currentQId) return null;
    return { current: qHistory.length + 1, total: 6 };
  }, [personaType, currentQId, qHistory]);

  const handleTypeSelect = (type) => {
    setPersonaType(type);
    setAnswers({});
    setCurrentQId(null);
  };

  const handleObjectiveSelect = (obj) => {
    setObjective(obj);
  };

  const handleAnswerSelect = (optionLabel) => {
    setAnswers((prev) => ({ ...prev, [currentQId]: optionLabel }));
  };

  const handleNextQuestion = (topRef) => {
    const selectedLabel = answers[currentQId];
    if (!selectedLabel) return;
    const currentQData = QUESTION_FLOW[personaType][currentQId];
    const selectedOption = currentQData.options.find((o) => o.label === selectedLabel);

    if (selectedOption?.nextId === 'END') {
      setStep(3);
      setTimeout(() => topRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } else if (selectedOption) {
      setQHistory((prev) => [...prev, currentQId]);
      setCurrentQId(selectedOption.nextId);
      setTimeout(() => topRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  };

  const handlePrevQuestion = (topRef) => {
    if (qHistory.length === 0) {
      setStep(1);
    } else {
      const newHistory = [...qHistory];
      const prevQId = newHistory.pop();
      setQHistory(newHistory);
      setCurrentQId(prevQId);
      setTimeout(() => topRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  };

  const addSample = () => setSamples((prev) => [...prev, { id: Date.now(), text: '', source: 'facebook', customSource: '' }]);
  const removeSample = (id) => samples.length > 1 && setSamples((prev) => prev.filter((s) => s.id !== id));
  const updateSample = (id, field, value) => setSamples((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  const handleReset = () => {
    setStep(1);
    setPersonaType(null);
    setObjective(null);
    setCurrentQId(null);
    setQHistory([]);
    setAnswers({});
    setSamples([{ id: Date.now(), text: '', source: 'facebook', customSource: '' }]);
  };

  return {
    step, setStep, personaType, objective, currentQId, qHistory, answers, samples,
    questionProgress,
    handleTypeSelect, handleObjectiveSelect, handleAnswerSelect,
    handleNextQuestion, handlePrevQuestion,
    addSample, removeSample, updateSample, handleReset,
  };
}
