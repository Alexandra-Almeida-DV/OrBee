import { useState, useCallback } from 'react';
import api from '../services/api'; 

export interface MetaData {
  current_page?: number;
  total_pages?: number;
  target_value?: number;
  current_value?: number;
  unit?: string;
  streak?: number;
  last_done?: string | null;
  start_date?: string;
  end_date?: string;
  insights?: string;
  notes?: string;
  purpose?: string;
  author?: string;
  daily_goal?: number;
  meta_type?: string;
  category?: string;  
  priority?: string;  
  links?: { id: string; url: string }[];
  tasks?: { id: string; text: string; completed: boolean }[];
  ingredients?: string;
  instructions?: string;
}

export interface Project {
  id: number;
  name: string;
  type: string;
  progress: number;
  description: string;
  meta_data: MetaData;
}

export function useProjectForm(onSuccess: () => void) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // --- Estados do Formulário ---
  const [name, setName] = useState('');
  const [type, setType] = useState('projeto');
  const [author, setAuthor] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(10);
  const [currentValue, setCurrentValue] = useState(0);
  const [targetValue, setTargetValue] = useState(0);
  const [unit, setUnit] = useState('R$');
  const [metaType, setMetaType] = useState<'quantitativa' | 'qualitativa'>('quantitativa');
  const [habitGoal, setHabitGoal] = useState(21);
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newGoalPurpose, setNewGoalPurpose] = useState('');
  const [priority, setPriority] = useState('média');
  const [category, setCategory] = useState('pessoal');
  const [links, setLinks] = useState<{ id: string; url: string }[]>([]);
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [tasks, setTasks] = useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setName('');
    setType('projeto');
    setTotalPages(0);
    setTargetValue(0);
    setUnit('R$');
    setNewStartDate('');
    setNewEndDate('');
    setNewDescription('');
    setNewNotes('');
    setNewGoalPurpose('');
    setHabitGoal(21);
    setPriority('média');
    setCategory('pessoal');
    setTasks([]);
    setLinks([]);
    setNewTaskText('');
    setAuthor('');
    setCurrentPage(0);
    setDailyGoal(10);
    setCurrentValue(0);
    setIngredients('');
    setInstructions('');
  }, []);

const handleOpenEdit = useCallback((project: Project) => {
    setSelectedProject(project);
    setName(project.name);
    setType(project.type.toLowerCase());

    const meta = project.meta_data;

    if (meta) {
        setCategory(meta.category || 'pessoal');
        setPriority(meta.priority || 'média');
        setNewStartDate(meta.start_date || '');
        setNewEndDate(meta.end_date || '');
        setNewDescription(meta.insights || project.description || '');
        setLinks(meta.links || []); 
        setTasks(meta.tasks || []);
        setAuthor(meta.author || '');
        setCurrentPage(meta.current_page || 0);
        setTotalPages(meta.total_pages || 0);
        setTargetValue(meta.target_value || 0);
        setCurrentValue(meta.current_value || 0);
        setIngredients(meta.ingredients || '');
        setInstructions(meta.instructions || '');
    }
    
    setNewStartDate(meta.start_date || '');
    setNewEndDate(meta.end_date || '');
    setNewDescription(meta.insights || project.description || '');
    setNewNotes(meta.notes || '');
    setNewGoalPurpose(meta.purpose || '');
    setAuthor(meta.author || '');
    setCurrentPage(meta.current_page || 0);
    setTotalPages(meta.total_pages || 0);
    setDailyGoal(meta.daily_goal || 10);
    setCurrentValue(meta.current_value || 0);
    setTargetValue(meta.target_value || 0);
    setUnit(meta.unit || 'R$');
    setMetaType((meta.meta_type as 'quantitativa' | 'qualitativa') || 'quantitativa');
    setHabitGoal(meta.target_value || 21);
    setCategory(meta.category || 'pessoal');
    setPriority(meta.priority || 'média');
    setLinks(meta.links || []);
    setTasks(meta.tasks || []);
    setIngredients(meta.ingredients || '');
    setInstructions(meta.instructions || '');

    setIsModalOpen(true);
  }, []);

  const handleSaveProject = async () => {
    if (!name.trim()) return;
    const lowerType = type.toLowerCase();

    const meta_data: MetaData = {
      start_date: newStartDate,
      end_date: newEndDate,
      insights: newDescription,
      notes: newNotes,
      purpose: newGoalPurpose,
      total_pages: totalPages,
      current_page: currentPage,
      author: author,
      daily_goal: dailyGoal,
      target_value: lowerType === 'habito' ? habitGoal : targetValue,
      current_value: currentValue,
      unit: lowerType === 'habito' ? 'dias' : unit,
      meta_type: metaType,
      streak: selectedProject?.meta_data.streak || 0,
      last_done: selectedProject?.meta_data.last_done || null,
      category: category,
      priority: priority,
      links: links,
      tasks: tasks,
      ingredients: ingredients,
      instructions: instructions,
    };

    const payload = {
      name,
      type: lowerType,
      meta_data,
      description: lowerType === 'receita' ? instructions.slice(0, 100) : (newDescription || newGoalPurpose || ""),
    };

    try {
      if (selectedProject) {
        await api.put(`/projects/${selectedProject.id}`, payload);
      } else {
        await api.post('/projects/', payload);
      }
      onSuccess(); 
      closeModal();
    } catch (error) {
      console.error("Erro na persistência:", error);
    }
  };

  // --- Cálculos de Progresso ---
  const projectProgress = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) 
    : 0;

  const readingProgress = totalPages > 0 
    ? Math.min(Math.round((currentPage / totalPages) * 100), 100) 
    : 0;

  const metaProgress = targetValue > 0 
    ? Math.min(Math.round((currentValue / targetValue) * 100), 100) 
    : 0;

  return {
    states: {
      isModalOpen, selectedProject, name, type, author, currentPage,
      totalPages, dailyGoal, currentValue, targetValue, unit, metaType,
      habitGoal, newStartDate, newEndDate, newDescription, newNotes,
      newGoalPurpose, priority, category, links, newLinkUrl, tasks, newTaskText,
      ingredients, instructions 
    },
    progress: {
      projectProgress, readingProgress, metaProgress
    },
    actions: {
      setIsModalOpen, setName, setType, setAuthor, setCurrentPage, setTotalPages,
      setDailyGoal, setCurrentValue, setTargetValue, setUnit, setMetaType,
      setHabitGoal, setNewStartDate, setNewEndDate, setNewDescription,
      setNewNotes, setNewGoalPurpose, setPriority, setCategory, setLinks,
      setNewLinkUrl, setTasks, setNewTaskText,
      setIngredients, setInstructions, 
      closeModal, handleOpenEdit, handleSaveProject
    }
  };
}